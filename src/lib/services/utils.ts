export function compressImage(
    imageData: Blob | File,
    maxSizeKB: number,
    quality: number = 0.7
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageData);
        reader.onload = function (event: ProgressEvent<FileReader>) {
            const img = new Image();
            img.src = (event.target?.result as string) || '';
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Unable to get 2D context'));
                    return;
                }
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const compressAndCheckSize = (q: number): Promise<Blob> => {
                    return new Promise((resolve) => {
                        canvas.toBlob(
                            (blob) => {
                                if (blob) {
                                    resolve(blob);
                                } else {
                                    reject(new Error('Failed to create Blob'));
                                }
                            },
                            'image/jpeg',
                            q
                        );
                    });
                };

                const compress = async () => {
                    let currentQuality = quality;
                    let blob = await compressAndCheckSize(currentQuality);

                    while (blob.size > maxSizeKB * 1024 && currentQuality > 0.05) {
                        currentQuality -= 0.05;
                        blob = await compressAndCheckSize(currentQuality);
                    }

                    resolve(blob);
                };

                compress().catch(reject);
            };
        };
        reader.onerror = function (error: ProgressEvent<FileReader>) {
            reject(error);
        };
    });
}