# Fighting Fantasy Character Tracker (Frontend)

A React + TypeScript frontend application for tracking **Fighting Fantasy** gamebook characters. Create, manage, and battle with your characters while tracking their stats throughout your adventures.

## Tech Stack

- **Build tooling**: Vite
- **UI**: React, Material UI (`@mui/material`)
- **State management**: Zustand
- **Routing**: React Router DOM
- **Language**: TypeScript

## Features

### Character Management
- **Character Creation**: Create new characters with name, Skill, Stamina, Luck, and Gold stats
- **Character Selection**: Browse and select from saved characters via a table interface
- **Character Deletion**: Remove characters from your saved list
- **Character Updates**: Automatically sync character stats after battles

### Character Display
- **Character Sheet**: View current character stats (Skill, Stamina, Luck, Gold) with increment/decrement buttons for manual adjustments
- **Real-time Updates**: Character stats update automatically after battles

### Battle System
- **Combat Mechanics**: Fully implemented battle system with enemy stats
- **Combat Resolution**: 
  - Roll-based combat (2d6 + Skill for both player and enemy)
  - Winner deals 2 Stamina damage
  - Automatic character updates after taking damage
  - Victory/defeat alerts
- **Enemy Management**: Set enemy Skill and Stamina before combat

### Navigation
- **Multi-page Routing**: Navigate between main page, character selection, and battle screens
- **Intuitive UI**: Clear navigation buttons and organized page structure

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager
- A backend API server (see API Configuration below)

### Installation

1. **Install dependencies**

```bash
npm install
```

2. **Configure environment variables**

Create a `.env` file in the root directory:

```env
VITE_SERVER_URL=http://localhost:3000
```

Replace `http://localhost:3000` with your backend API URL.

3. **Run the development server**

```bash
npm run dev
```

By default, Vite will serve the app at `http://localhost:5173` (or the next available port).

4. **Build for production**

```bash
npm run build
```

This runs TypeScript compilation and then builds the production bundle.

5. **Preview the production build**

```bash
npm run preview
```

## Project Structure

### Core Files
- **`src/App.tsx`**: Main app component with React Router setup and route definitions
- **`src/main.tsx`**: Application entry point with BrowserRouter wrapper
- **`src/store.ts`**: Zustand store for global character state management

### Components

#### Pages
- **`src/components/MainPage.tsx`**: Main landing page with navigation buttons and character display/creation
- **`src/components/CharactersSelect.tsx`**: Character selection page with table view, select, and delete functionality
- **`src/components/BattleSheet.tsx`**: Battle interface with combat mechanics and enemy management

#### Character Components
- **`src/components/CharacterSheet.tsx`**: Displays character stats with manual adjustment buttons
- **`src/components/CharacterCreationSheet.tsx`**: Form for creating new characters

#### Check Components (Placeholders)
- **`src/components/CheckComponents/SkillCheck.tsx`**: Placeholder for skill-check functionality

### Utilities
- **`src/utils/api.ts`**: API client functions:
  - `getAllCharacters()`: Fetch all saved characters
  - `createCharacter(character)`: Create a new character
  - `updateCharacter(character, id)`: Update an existing character
  - `deleteCharacter(id)`: Delete a character

## Routing

The application uses React Router with the following routes:

- **`/`**: Main page (character overview and creation)
- **`/select`**: Character selection page
- **`/battle`**: Battle interface

## API Configuration

This frontend expects a backend API that implements the following endpoints:

- `GET /api/all` - Returns array of all characters
- `POST /api/createcharacter` - Creates a new character, returns created character
- `POST /api/createcharacter/:id` - Updates character with given ID, returns updated character
- `DELETE /api/character/:id` - Deletes character with given ID

The API base URL is configured via the `VITE_SERVER_URL` environment variable.

## Character Data Model

```typescript
type Character = {
    id: number;
    name: string;
    skill: number;
    stamina: number;
    luck: number;
    gold: number;
}
```

## Battle Mechanics

The battle system uses Fighting Fantasy combat rules:
- Each combatant rolls 2d6 + Skill
- Higher roll wins the round
- Winner deals 2 Stamina damage
- Combat continues until one combatant reaches 0 Stamina
- Character stats are automatically saved after taking damage

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Notes

- The battle and skill-check components are fully functional for battles, with skill-check functionality planned for future updates
- Character stats persist automatically after battles via the update API
- The app uses Zustand for lightweight state management without requiring Redux
