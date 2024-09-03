import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { DateTime } from 'luxon';
import type { Location } from '@capacitor-community/background-geolocation';
import type { RecordModel } from 'pocketbase';
import { pb } from './pocketbase';

export class SQLiteService {
    private static sqlite: SQLiteConnection;
    private static db: SQLiteDBConnection | null = null;

    private static dbName = 'aktivan_activities';

    private constructor() { }

    static async initializeDatabase() {
        if (SQLiteService.db) {
            return;
        }

        SQLiteService.sqlite = new SQLiteConnection(CapacitorSQLite);

        SQLiteService.db = await SQLiteService.sqlite.createConnection(SQLiteService.dbName, false, "no-encryption", 3, false);
        await SQLiteService.db?.open();

        console.log("Database initialized", SQLiteService.db.isDBOpen());

        // Create a table if it doesn't exist
        const query = `
      CREATE TABLE IF NOT EXISTS activities (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        start TIMESTAMP,
        end TIMESTAMP,
        duration INTEGER,
        type TEXT,
        calories INTEGER,
        steps INTEGER,
        distance INTEGER
      );

      CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        activity_id INTEGER,
        latitude REAL,
        longitude REAL,
        altitude REAL,
        accuracy REAL,
        speed REAL,
        time INTEGER,
        FOREIGN KEY (activity_id) REFERENCES activities (id)
      );
    `;
        await SQLiteService.db?.execute(query);
    }

    static async addActivity(activity: {
        start: DateTime;
        end: DateTime;
        duration: number;
        type: string;
        calories: number;
        steps: number;
        distance: number;
    }) {
        await SQLiteService.initializeDatabase();
        if (!SQLiteService.db) {
            throw new Error('Database not initialized');
        }

        const query = `
            INSERT INTO activities (start, end, duration, type, calories, steps, distance)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            activity.start.toSQL(),
            activity.end.toSQL(),
            activity.duration,
            activity.type,
            activity.calories,
            activity.steps,
            activity.distance
        ];

        const result = await SQLiteService.db?.run(query, values);
        return result?.changes?.lastId;
    }

    static async removeActivity(id: number) {
        await SQLiteService.initializeDatabase();
        if (!SQLiteService.db) {
            throw new Error('Database not initialized');
        }

        const query = `DELETE FROM activities WHERE id = ?`;
        const result = await SQLiteService.db.run(query, [id]);

        if (result.changes?.changes === 0) {
            throw new Error('Activity not found');
        }

        // Also remove associated locations
        const locationQuery = `DELETE FROM locations WHERE activity_id = ?`;
        await SQLiteService.db.run(locationQuery, [id]);
    }

    static async getAllActivities() {
        await SQLiteService.initializeDatabase();
        if (!SQLiteService.db) {
            throw new Error('Database not initialized');
        }

        const query = `SELECT * FROM activities`;
        const result = await SQLiteService.db.query(query);

        return result.values?.map(row => ({
            ...row,
            start: DateTime.fromSQL(row.start),
            end: DateTime.fromSQL(row.end)
        })) || [];
    }

    static async addLocationForActivity(activityId: number, loc: Location) {
        await SQLiteService.initializeDatabase();
        if (!SQLiteService.db) {
            throw new Error('Database not initialized');
        }

        const query = `INSERT INTO locations (activity_id, latitude, longitude, altitude, accuracy, speed, time) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [activityId, loc.latitude, loc.longitude, loc.altitude, loc.accuracy, loc.speed, loc.time];
        const result = await SQLiteService.db.run(query, values);
        return result.changes?.lastId;
    }

    static async getLocationsForActivity(activityId: number, limit: number = 100, skip: number = 0) {
        await SQLiteService.initializeDatabase();
        if (!SQLiteService.db) {
            throw new Error('Database not initialized');
        }

        const query = `SELECT * FROM locations WHERE activity_id = ? ORDER BY time DESC LIMIT ${limit} OFFSET ${skip}`;
        const result = await SQLiteService.db.query(query, [activityId]);

        return result.values || [];
    }

    static async updateActivity(activity: {
        id: number;
        start: DateTime;
        end: DateTime;
        duration: number;
        type: string;
        calories: number;
        steps: number;
        distance: number;
    }) {
        await SQLiteService.initializeDatabase();
        if (!SQLiteService.db) {
            throw new Error('Database not initialized');
        }

        const query = `UPDATE activities SET start = ?, end = ?, duration = ?, type = ?, calories = ?, steps = ?, distance = ? WHERE id = ?`;
        const values = [activity.start.toSQL(), activity.end.toSQL(), activity.duration, activity.type, activity.calories, activity.steps, activity.distance, activity.id];
        const result = await SQLiteService.db.run(query, values);
        return result.changes?.changes === 1;
    }

    static async saveLocations(localActivityId: number, activity: RecordModel) {
        let skip = 0;

        for (;;) {
            const locations = await SQLiteService.getLocationsForActivity(localActivityId, 100, skip);
            for (const loc of locations) {
                await pb.collection("locations").create({
                    activity: activity.id,
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                    altitude: loc.altitude,
                    accuracy: loc.accuracy,
                    speed: loc.speed,
                    time: loc.time,
                });
            }
            if (!locations || locations.length === 0) {
                break;
            }

            skip += 100;
        }

        SQLiteService.removeActivity(localActivityId);
    }
}