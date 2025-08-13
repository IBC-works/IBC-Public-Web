import { InjectionToken } from "@angular/core";
import { AssetsFileManager } from "../../../classes/AssetsFileManager.class";

export const  APP_GENERAL_IMAGE_CONFIGURATION = new InjectionToken<{[key: string]: string}>('app-gen-image-config', {
    providedIn: 'any',
    factory() {
        const assetManager = new AssetsFileManager()

        return {
            "black_logo": assetManager.getImage('logo-black', 'png'),

            "logo": assetManager.getImage('logo', 'png'),

            "forest": assetManager.getImage('forest-backgeound', "jpg"),

            "dummy_0": assetManager.getImage('dummy-article-1', 'jpg'),

            "dummy_1": assetManager.getImage('dummy-article-2', 'jpg'),

            "dummy_2": assetManager.getImage('dummy-article-3', 'png')
        }
    },
})