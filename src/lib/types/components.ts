export enum AlertType {
    INFO = "info",
    WARNING = "warning",
}

export interface Alert {
    text: string;
    type: AlertType;
}