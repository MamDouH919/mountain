// config.ts

export interface SocialLink {
    name: string;
    link: string;
}

export interface AppConfig {
    basePath: string;
    siteTitle: string;
    languages: string[];
    name: {
        [key: string]: string;
    }
}

export interface ThemeConfig {
    primaryDark: string;
    primaryLight: string;
    secondaryDark: string;
    secondaryLight: string;
}

export interface Config {
    app: AppConfig;
    theme: ThemeConfig;
    socialLinks: SocialLink[];
}

// Example of how you might import JSON data
export const config: Config = {
    app: {
        basePath: "/",
        siteTitle: "Mountain",
        languages: ["ar", "en"],
        name: {
            "ar": "ماونتين",
            "en": "mountain"
        },
    },
    theme: {
        primaryDark: "#fff",
        primaryLight: "#000",
        secondaryDark: "#000",
        secondaryLight: "#eee"
    },
    socialLinks: [
        {
            name: "facebook",
            link: "https://www.facebook.com/@m.mountain.agency"
        },
        {
            name: "instagram",
            link: "https://www.instagram.com/mm_adv_agency"
        }
    ]
};

// You can now use the `config` object with full type safety
