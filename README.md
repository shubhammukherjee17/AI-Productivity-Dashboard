# Flowstate: AI-Powered Productivity Dashboard

**Flowstate** is an advanced productivity dashboard designed to help you optimize your work, manage energy levels, and enter deep work states. Built with Next.js 16 and AI-driven insights, it goes beyond simple task management by aligning your daily activities with your long-term goals and biological rhythm.

## 🚀 Key Features

- **⚡ Smart Dashboard**: A centralized command center giving you a real-time overview of your productivity metrics, active tasks, and daily progress.
- **🔋 Energy Scheduling**: Intelligently schedule your most demanding tasks during your peak energy hours to maximize efficiency and prevent burnout.
- **🎯 Focus Mode**: A dedicated, distraction-free environment for deep work sessions, helping you improved concentration and flow.
- **📈 Momentum Tracking**: Visualize your consistency and build streaks to maintain high motivation levels over time.
- **🔗 Goal Alignment**: Ensure every task you do contributes to your higher-level objectives, keeping you focused on what truly matters.
- **📊 Weekly Insights**: comprehensive analytics and trends to help you understand your working patterns and improve week over week.
- **🧠 AI Explainability**: Transparent insights into your productivity scores, helping you understand _why_ you are (or aren't) productive (powered by `ExplainabilityModal`).

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/), [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Visualization**: [Recharts](https://recharts.org/)
- **PWA Support**: `@ducanh2912/next-pwa`

## 🏁 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/flowstate.git
    cd flowstate
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

### Running Locally

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

To create an optimized production build:

```bash
npm run build
# or
bun run build
```

The output will be generated in the `.next` folder.

## 📂 Project Structure

- **`app/`**: Contains the Next.js App Router pages and layouts.
- **`components/`**: Reusable UI components (Dashboard, Widgets, etc.).
  - `Dashboard.tsx`: Main dashboard view.
  - `EnergySchedule.tsx`: Component for managing energy-based scheduling.
  - `FocusModeDialog.tsx`: Modal for the focus session timer.
  - `ui/`: Generic UI primitives (Buttons, Cards, etc.).
- **`lib/`**: Utility functions and shared logic.
- **`public/`**: Static assets like images and icons.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
