declare module "floyd-steinberg" {
    type ImageDataSubset = Partial<ImageData> & Pick<ImageData, 'width' | 'height' | 'data'>;

    function floyd_steinberg<T extends ImageDataSubset>(image: T): T;
    export = floyd_steinberg;
}