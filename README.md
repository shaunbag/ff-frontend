# Fighting Fantasy Character Tracker (Frontend)

A React + TypeScript frontend application for tracking **Fighting Fantasy** gamebook characters. Create, manage, and battle with your characters while tracking their stats throughout your adventures.

## Tech Stack

- **Build tooling**: Vite
- **UI**: React, Material UI (`@mui/material`)
- **State management**: Zustand
- **Routing**: React Router DOM
- **Language**: TypeScript
- **Styling**: Custom CSS with modern dark theme

## Features

### Character Management
- **Character Creation**: Create new characters with name, Skill, Stamina, Luck, and Gold stats
- **Character Selection**: Browse and select from saved characters via a table interface
- **Character Deletion**: Remove characters from your saved list
- **Character Updates**: Automatically sync character stats after battles and manual adjustments
- **Real-time Stat Adjustments**: Increment/decrement buttons that automatically save changes to the backend

### Character Display
- **Character Sheet**: View current character stats (Skill, Stamina, Luck, Gold) with increment/decrement buttons for manual adjustments
- **Auto-save**: All stat changes are automatically persisted to the backend
- **Real-time Updates**: Character stats update automatically after battles

### Battle System
- **Combat Mechanics**: Fully implemented battle system with enemy stats
- **Combat Resolution**: 
  - Roll-based combat (2d6 + Skill for both player and enemy)
  - Winner deals 2 Stamina damage
  - Automatic character updates after taking damage
  - Battle result modals with clear feedback
  - Continue fighting or close after victory/defeat
- **Enemy Management**: Set enemy Skill and Stamina before combat
- **Battle Modals**: Visual feedback for battle outcomes (wounded, enemy wounded, dead, enemy dead, draw)

### Luck Check System
- **Luck Testing**: Fully implemented luck check functionality
- **Luck Check Modal**: Interactive modal for testing your character's luck
- **Automatic Luck Reduction**: Testing luck decreases your Luck stat by 1
- **Roll Mechanics**: Roll 2d6 and compare against current Luck stat
- **Result Feedback**: Clear indication of lucky or unlucky outcomes
- **Auto-save**: Luck stat changes are automatically saved to the backend

### Items & Equipment
- **Equipment Management**: Add and remove equipment items for the active character, each with a name and effect
- **Potion Management**: Track potions with name and effect per character
- **Per‑character Inventories**: Equipment and potions are loaded and persisted per selected character via the backend

### Progress Tracking
- **Book Progress**: Track which Fighting Fantasy book and section a character is currently on
- **Multiple Books per Character**: Store multiple book/section combinations and switch between them
- **Progress Modal**: Add a new book + section or update the current book’s section from an in‑app modal

### Navigation & UI
- **Multi-page Routing**: Navigate between main page, character selection, and battle screens
- **Intuitive UI**: Clear navigation buttons and organized page structure
- **Modern Design**: Dark theme with gradient backgrounds, glassmorphism effects, and smooth animations
- **Responsive Layout**: Two-column battle layout that adapts to mobile screens
- **Modal System**: Overlay modals for battle results, luck checks, item management, and progress updates

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
- **`src/App.css`**: Component-specific styles and layout utilities
- **`src/index.css`**: Global styles, theme variables, and base component styles

### Components

#### Pages
- **`src/components/MainPage.tsx`**: Main landing page with navigation toolbar, character display/creation, and luck check button
- **`src/components/CharacterComponents/CharactersSelect.tsx`**: Character selection page with table view, select, and delete functionality
- **`src/components/BattleComponents/BattleSheet.tsx`**: Battle interface with combat mechanics, enemy management, and battle modal integration

#### Character Components
- **`src/components/CharacterComponents/CharacterSheet.tsx`**: Displays character stats with manual adjustment buttons that auto-save
- **`src/components/CharacterComponents/CharacterCreationSheet.tsx`**: Form for creating new characters using Material UI components

#### Battle Components
- **`src/components/BattleComponents/BattleModal.tsx`**: Modal component for displaying battle results with options to continue fighting or close

#### Check Components
- **`src/components/CheckComponents/LuckCheckModal.tsx`**: Modal component for testing luck with automatic luck reduction and result feedback

#### Items & Equipment Components
- **`src/components/ItemsAndEquipmentComponents/Equipment.tsx`**: Table view for a character’s equipment, with add and delete actions
- **`src/components/ItemsAndEquipmentComponents/Potions.tsx`**: Table view for a character’s potions, with add and delete actions
- **`src/components/ItemsAndEquipmentComponents/ItemModal.tsx`**: Shared modal for adding new equipment or potion items

#### Progress Components
- **`src/components/ProgressComponents/ProgressTracker.tsx`**: Displays the current book and section and lets you switch between saved progress entries
- **`src/components/ProgressComponents/ProgressModal.tsx`**: Modal for adding a new book/section or updating the current book’s section

### Utilities
- **`src/utils/api.ts`**: API client functions:
  - `getAllCharacters()`: Fetch all saved characters
  - `createCharacter(character)`: Create a new character
  - `updateCharacter(character, id)`: Update an existing character
  - `deleteCharacter(id)`: Delete a character
  - `getPotionsByCharacterId(id)`: Fetch all potions for a character
  - `addPotion(item)`: Add a new potion for a character
  - `deletePotion(id)`: Delete a potion by ID
  - `getEquipmentByCharacterId(id)`: Fetch all equipment for a character
  - `addEquipment(item)`: Add a new equipment item for a character
  - `deleteEquipment(id)`: Delete an equipment item by ID
  - `getProgressByCharacterId(id)`: Fetch all saved progress entries (book/section) for a character
  - `addProgress(progressDto)`: Add a new progress entry
  - `updateProgressById(id, progressDto)`: Update an existing progress entry
  - `deleteProgressById(id)`: Delete a progress entry
- **`src/utils/utilityFunctions.ts`**: Helper functions:
  - `updateCharacterStats(player)`: Utility function to update character stats on the backend

## Routing

The application uses React Router with the following routes:

- **`/`**: Main page (character overview and creation)
- **`/select`**: Character selection page
- **`/battle`**: Battle interface

## API Configuration

This frontend expects a backend API that implements the following endpoints:

- **Characters**
  - `GET /api/character` - Returns array of all characters
  - `POST /api/character` - Creates a new character, returns created character
  - `GET /api/character/{id}` - Returns a single character by ID
  - `POST /api/character/{id}` - Updates character with given ID, returns updated character
  - `DELETE /api/character/{id}` - Deletes character with given ID

- **Equipment**
  - `GET /api/equipment/{characterId}` - Returns all equipment items for a character
  - `POST /api/equipment` - Adds a new equipment item for a character
  - `DELETE /api/equipment/{id}` - Deletes an equipment item by ID

- **Potions**
  - `GET /api/potions/{characterId}` - Returns all potions for a character
  - `POST /api/potions` - Adds a new potion for a character
  - `DELETE /api/potions/{id}` - Deletes a potion by ID

- **Progress**
  - `GET /api/progress/{characterId}` - Returns all saved progress entries (book/section) for a character
  - `POST /api/progress` - Creates a new progress entry
  - `POST /api/progress/{id}` - Updates an existing progress entry
  - `DELETE /api/progress/{id}` - Deletes a progress entry by ID

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

type CharacterDto = {
    name: string;
    skill: number;
    stamina: number;
    luck: number;
    gold: number;
}
```

## Game Mechanics

### Battle Mechanics

The battle system uses Fighting Fantasy combat rules:
- Each combatant rolls 2d6 + Skill
- Higher roll wins the round
- Winner deals 2 Stamina damage
- Combat continues until one combatant reaches 0 Stamina
- Character stats are automatically saved after taking damage
- Battle results are displayed in a modal with options to continue or close

### Luck Check Mechanics

- Roll 2d6 and compare the result to your current Luck stat
- If the roll is less than or equal to your Luck: **Lucky** ✓
- If the roll is greater than your Luck: **Unlucky** ✗
- Testing your luck automatically decreases your Luck stat by 1
- Luck changes are automatically saved to the backend

## Styling & Design

The application features a modern dark theme with:

- **Custom CSS Variables**: Theme colors, spacing, and effects defined in `index.css`
- **Glassmorphism**: Translucent panels with backdrop blur effects
- **Gradient Backgrounds**: Radial gradients for visual depth
- **Responsive Design**: Mobile-friendly layouts with media queries
- **Smooth Animations**: Hover effects and transitions (respects `prefers-reduced-motion`)
- **Component Classes**: Reusable utility classes for consistent styling:
  - `.page-header`: Page header with toolbar
  - `.panel`: Content panels with glassmorphism
  - `.two-col`: Two-column grid layout
  - `.form-grid`: Form input grid
  - `.stat-list` / `.stat-row`: Character stat display
  - `.modal-background` / `.modal-container`: Modal styling

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Notes

- Character stats persist automatically after battles, luck checks, and manual adjustments via the update API
- The app uses Zustand for lightweight state management without requiring Redux
- All modals use a consistent styling system with backdrop blur
- The UI is fully responsive and works on mobile devices
- Battle and luck check features are fully functional and integrated with the backend
