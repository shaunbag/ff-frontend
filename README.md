## Fighting Fantasy Character Tracker (Frontend)

This is a React + TypeScript frontend for tracking **Fighting Fantasy** characters.  
It lets you create and manage characters, persist them via an API, and select an existing character to view core stats while you play.

### Tech Stack
- **Build tooling**: Vite
- **UI**: React, Material UI (`@mui/material`)
- **State management**: Zustand
- **Language**: TypeScript

### Features
- **Character creation**:  
  - Enter name, Skill, Stamina, Luck, and Gold in the `CharacterCreationSheet`.
  - Submits to a backend via `createCharacter` (see `src/utils/api.ts`) and stores the result in a global Zustand store.
- **Character list & selection**:  
  - `CharacterSelect` fetches all characters from the backend with `getAllCharacters`.
  - Select a character from a dropdown to set it as the active character.
- **Character overview**:  
  - The main `App` shows the current character’s name and stats (Skill, Stamina, Luck, Gold).
- **Placeholders for gameplay utilities**:  
  - `BattleSheet`, `CheckComponents/Battle`, and `CheckComponents/SkillCheck` exist as stubs for future battle and skill‑check flows.

### Getting Started

- **Install dependencies**

```bash
npm install
```

- **Run the development server**

```bash
npm run dev
```

By default, Vite will print the local URL (typically `http://localhost:5173`) in the terminal.

- **Build for production**

```bash
npm run build
```

This runs the TypeScript project references build and then `vite build`.

- **Preview the production build**

```bash
npm run preview
```

### Project Structure (frontend)

- **`src/App.tsx`**: Top‑level layout; shows the app title, character selector, and either the current character stats or the character creation form.
- **`src/store.ts`**: Zustand store defining the `Character` model, current character, progress fields, and list of all characters.
- **`src/components/CharacterCreationSheet.tsx`**: Form for creating a character and sending it to the backend.
- **`src/components/CharactersSelect.tsx`**: Dropdown to select an existing character from `allCharacters`.
- **`src/components/BattleSheet.tsx`**: Placeholder component for a detailed battle sheet.
- **`src/components/CheckComponents/Battle.tsx`**: Placeholder for battle‑specific UI/logic.
- **`src/components/CheckComponents/SkillCheck.tsx`**: Placeholder for skill‑check UI/logic.
- **`src/utils/api.ts`**: API helpers such as `createCharacter` and `getAllCharacters` (expects an external backend).

### Notes
- This project is **frontend only** and expects a separate backend that implements the character API used in `src/utils/api.ts`.
- The battle and skill‑check components are currently stubs and can be expanded with full rules and UI as needed.

