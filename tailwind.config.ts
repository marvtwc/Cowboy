import animate from "tailwindcss-animate";
const colors = require("tailwindcss/colors");

module.exports = {
  safelist: ["dark"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        base: {
          default: "#16181A",
          100: "#e8e8e9",
          200: "#b9babb",
          300: "#8b8c8d",
          500: "#2E3031",
          600: "#131416",
          700: "#0e1011",
          800: "#0a0b0c",
          900: "#060607",
        },
        accent: {
          default: "#016FB9",
          100: "#e6f1f8",
          200: "#b3d4ea",
          300: "#80b7dc",
          400: "#4e9ace",
          500: "#1b7ec0",
          600: "#015e9d",
          700: "#014878",
          800: "#003253",
          900: "#001c2f",
        },
        status: {
          accepted: {
            primary: "#78ed76",
            secondary: "#8CEE8B",
            border: "#78ED76",
          },
          rejected: {
            primary: "#ec2c2c",
            secondary: "#EC2C2C",
            border: "#EC2C2C",
          },
          pending: {
            primary: "#f5ec95",
            secondary: "#F5EC95",
            border: "#F5EC95",
          },
          sent: {
            primary: "#6ca2f2",
            secondary: "#13305B",
            border: "#6CA2F2",
          },
          notsent: {
            primary: "#b3b6bc",
            secondary: "#B3B6BC",
            border: "#B3B6BC",
          },
        },
        ringColor: {
          DEFAULT: colors.orange[500],
        },
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: 0 },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: 0 },
      },
      "collapsible-down": {
        from: { height: 0 },
        to: { height: "var(--radix-collapsible-content-height)" },
      },
      "collapsible-up": {
        from: { height: "var(--radix-collapsible-content-height)" },
        to: { height: 0 },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "collapsible-down": "collapsible-down 0.2s ease-in-out",
      "collapsible-up": "collapsible-up 0.2s ease-in-out",
    },
  },
  plugins: [animate],
};
