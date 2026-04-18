# KoinX Frontend Intern Assignment - Tax Loss Harvesting UI

This repository contains the implementation of the KoinX Tax Loss Harvesting tool built as part of the frontend intern assignment.

## Features

- **Tax Optimisation Calculator**: Instantly see updated tax liabilities when selecting assets with losses.
- **Responsive Layout**: Built with a mobile-first approach, fully responsive on tablets and desktops.
- **Dynamic Interactions**: Features an interactive Holdings table, custom tooltips, expanding/collapsing sections, and sorting logic.
- **Light & Dark Mode**: Seamlessly switch between light and dark themes using modern CSS variables and Tailwind CSS v4.
- **Mock Data Integrations**: Uses simulated APIs for Capital Gains and Asset Holdings with realistic mock data, including proper handling of M/K suffix abbreviations for large numbers.

## Tech Stack

- **Framework**: React 19 + TypeScript (built with Vite)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Utilities**: `clsx` and `tailwind-merge`

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/JSHemanthRao/KoinX.git
   cd KoinX
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Key Implementations

- **Custom Hook (`useTaxHarvesting`)**: Manages complex states, sorting logic, and recalculations of realised capital gains based on user selections independently from the UI components.
- **Tailwind V4 Themes**: Utilizes the modern CSS `@theme` architecture to create a crisp and scalable design system. Dark mode is implemented beautifully at the root level.
