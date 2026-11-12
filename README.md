# Microinteractions

A mobile-style smart-home prototype for exploring how small animations and feedback change everyday interactions.

Browse rooms and devices, adjust lights and heating, and compare the interface with microinteractions enabled or disabled. The interface and guided tasks are in German.

## What you can explore

- **Smart-home dashboard:** navigate rooms, device categories, and individual controls.
- **Device interactions:** change brightness, color temperature, heating, fan settings, and entertainment or household device states.
- **Onboarding flows:** try registration, adding a device, and removing devices.
- **Motion and feedback:** animated page changes, sliders, SVG effects, Lottie animations, and carousel pickers.
- **Guided evaluation:** an expandable task checklist walks through the main flows; the microinteraction preference and checklist are saved locally.

This is an interactive UI prototype using local application state and sample devices. Registration screens and device controls demonstrate the experience; they do not connect to a real smart-home service.

## Run locally

Use Node.js 22 LTS and npm.

```sh
git clone https://github.com/Julz0711/microinteractions.git
cd microinteractions
npm ci
npm run dev
```

Open the URL printed by Vite. Start at `/start` for onboarding or `/dashboard` to explore the populated dashboard. Open the task panel using the arrow at the left edge.

## Development

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Vite locally. |
| `npm run host` | Expose the development server to other devices on your network. |
| `npm run build` | Check TypeScript and produce a build in `dist/`. |
| `npm run preview` | Preview the production build. |
| `npm run lint` | Run ESLint. |

## How it is built

React and TypeScript provide the interface, Redux Toolkit coordinates state, and React Router handles the flows. Framer Motion, GSAP, Lottie, and custom SVG components supply the animation layer; Tailwind CSS styles the UI.

| Path | Responsibility |
| --- | --- |
| [src/pages/](src/pages/) | Dashboard, device, profile, and onboarding screens. |
| [src/components/](src/components/) | Device controls, animated UI, task panel, and navigation. |
| [src/store/](src/store/) | Redux state and the microinteraction preference. |
| [src/Hooks/](src/Hooks/) | Device, category, and animation hooks. |
| [src/data/](src/data/) | Sample content. |
| [src/routes/Router.tsx](src/routes/Router.tsx) | Routes and animated page transitions. |
