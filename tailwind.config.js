/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontFamily: {
                sans: ["Lexend", 'sans-serif'],
                heading: ["Outfit", 'sans-serif']
            },
            textColor:{
                primary: {DEFAULT:"var(--primary-700)",300:"var(--primary-300)"},
                danger:"var(--danger-700)",
                info:"var(--info-700)",
                success:"var(--success-700)",
                accent:"var(--accent-700)",
                white:"var(--white)",
                black:"var(--black)",
                warning:"var(--warning-700)",
                100:"var(--gray-950)",
                200:"var(--gray-800)",
                300:"var(--gray-600)",
            },
            colors: {
                border: {
                    DEFAULT: "var(--gray-100)",
                    200: "var(--gray-200)",
                },
                input: "hsl(var(--input))",
                ring: "var(--gray-100)",
                primary: {
                    DEFAULT: "var(--primary-500)",
                    50: "var(--primary-50)",
                    100: "var(--primary-100)",
                    200: "var(--primary-200)",
                    300: "var(--primary-300)",
                    400: "var(--primary-400)",
                    500: "var(--primary-500)",
                    600: "var(--primary-600)",
                    700: "var(--primary-700)",
                    800: "var(--primary-800)",
                    900: "var(--primary-900)",
                    950: "var(--primary-950)",
                    translucent: "var(--primary-translucent)",
                },
                danger: {
                    DEFAULT: "var(--danger-500)",
                    50: "var(--danger-50)",
                    100: "var(--danger-100)",
                    200: "var(--danger-200)",
                    300: "var(--danger-300)",
                    400: "var(--danger-400)",
                    500: "var(--danger-500)",
                    600: "var(--danger-600)",
                    700: "var(--danger-700)",
                    800: "var(--danger-800)",
                    900: "var(--danger-900)",
                    950: "var(--danger-950)",
                    translucent: "var(--danger-translucent)",
                },
                warning: {
                    DEFAULT: "var(--warning-500)",
                    50: "var(--warning-50)",
                    100: "var(--warning-100)",
                    200: "var(--warning-200)",
                    300: "var(--warning-300)",
                    400: "var(--warning-400)",
                    500: "var(--warning-500)",
                    600: "var(--warning-600)",
                    700: "var(--warning-700)",
                    800: "var(--warning-800)",
                    900: "var(--warning-900)",
                    950: "var(--warning-950)",
                    translucent: "var(--warning-translucent)",
                },
                info: {
                    DEFAULT: "var(--info-500)",
                    50: "var(--info-50)",
                    100: "var(--info-100)",
                    200: "var(--info-200)",
                    300: "var(--info-300)",
                    400: "var(--info-400)",
                    500: "var(--info-500)",
                    600: "var(--info-600)",
                    700: "var(--info-700)",
                    800: "var(--info-800)",
                    900: "var(--info-900)",
                    950: "var(--info-950)",
                    translucent: "var(--info-translucent)",
                },
                gray: {
                    DEFAULT: "var(--gray-500)",
                    50: "var(--gray-50)",
                    100: "var(--gray-100)",
                    200: "var(--gray-200)",
                    300: "var(--gray-300)",
                    400: "var(--gray-400)",
                    500: "var(--gray-500)",
                    600: "var(--gray-600)",
                    700: "var(--gray-700)",
                    800: "var(--gray-800)",
                    900: "var(--gray-900)",
                    950: "var(--gray-950)",
                    translucent: "var(--gray-translucent)",
                },
                success: {
                    DEFAULT: "var(--success-500)",
                    50: "var(--success-50)",
                    100: "var(--success-100)",
                    200: "var(--success-200)",
                    300: "var(--success-300)",
                    400: "var(--success-400)",
                    500: "var(--success-500)",
                    600: "var(--success-600)",
                    700: "var(--success-700)",
                    800: "var(--success-800)",
                    900: "var(--success-900)",
                    translucent: "var(--success-translucent)",

                },
                white: {
                    DEFAULT:"var(--white)",
                    translucent:"var(--white-translucent)",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "var(--accent-500)",
                    50: "var(--accent-50)",
                    100: "var(--accent-100)",
                    200: "var(--accent-200)",
                    300: "var(--accent-300)",
                    400: "var(--accent-400)",
                    500: "var(--accent-500)",
                    600: "var(--accent-600)",
                    700: "var(--accent-700)",
                    800: "var(--accent-800)",
                    900: "var(--accent-900)",
                    950: "var(--accent-950)",
                    translucent: "var(--accent-translucent)",
                },
                popover: {
                    DEFAULT: "var(--white)",
                    foreground: "var(--gray-900)",
                },
                card: {
                    DEFAULT: "var(--white)",
                    foreground: "hsl(var(--card-foreground))",
                },
                surface: {
                    100: "var(--white)",
                    200: "var(--gray-100)",
                    300: "var(--gray-200)",
                    base: "var(--gray-50)",
                },
                overlay: "var(--overlay)",
                100: "var(--gray-100)",
                200: "var(--gray-200)",
                300: "var(--gray-300)",
            },
            keyframes: {
                "accordion-down": {
                    from: {height: 0},
                    to: {height: "var(--radix-accordion-content-height)"},
                },
                "accordion-up": {
                    from: {height: "var(--radix-accordion-content-height)"},
                    to: {height: 0},
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            fontSize: {
                // heading
                "heading-1": ["var(--heading-1-font-size)", {lineHeight:'var(--heading-1-line-height)',fontWeight:600}],
                "heading-2": ["var(--heading-2-font-size)", {lineHeight:'var(--heading-2-line-height)',fontWeight:600}],
                "heading-3": ["var(--heading-3-font-size)", {lineHeight:'var(--heading-3-line-height)',fontWeight:600}],
                "heading-4": ["var(--heading-4-font-size)", {lineHeight:'var(--heading-4-line-height)',fontWeight:600}],
                "heading-5": ["var(--heading-5-font-size)", {lineHeight:'var(--heading-5-line-height)',fontWeight:600}],
                "heading-6": ["var(--heading-6-font-size)", {lineHeight:'var(--heading-6-line-height)',fontWeight:600}],
                //display
                "display-lg": ["var(--display-lg)", 'var(--display-lg-line-height)'],
                "display-md": ["var(--display-md)", 'var(--display-md-line-height)'],
                "display-sm": ["var(--display-sm)", 'var(--display-sm-line-height)'],
                //title
                "title-lg": ["var(--title-lg)", 'var(--title-lg-line-height)'],
                "title-md": ["var(--title-md)", 'var(--title-md-line-height)'],
                "title-sm": ["var(--title-sm)", 'var(--title-sm-line-height)'],
                //body
                "body-lg": ["var(--body-lg)", 'var(--body-lg-line-height)'],
                "body-md": ["var(--body-md)", 'var(--body-md-line-height)'],
                "body-sm": ["var(--body-sm)", 'var(--body-sm-line-height)'],
                //label
                "label-lg": ["var(--body-lg)", 'var(--body-lg-line-height)'],
                "label-md": ["var(--body-md)", 'var(--body-md-line-height)'],
                "label-sm": ["var(--body-sm)", 'var(--body-sm-line-height)'],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
}