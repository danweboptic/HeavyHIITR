# HeavyHITR Boxing App

A modern boxing workout app with configurable rounds, pre-recorded audio cues, and offline functionality.

## Features

- **Timer and Workout System**
  - Configurable rounds (1-12)
  - Adjustable round length (30s-5min)
  - Customizable break periods (10s-60s)
  - Visual countdown timer with circular progress
  - Different workout types: fundamentals, power, speed, defense, endurance, freestyle
  - Multiple intensity levels: beginner, intermediate, advanced

- **Pre-recorded Audio Cue System**
  - Dynamic audio cue selection based on workout type, intensity, and timing
  - Audio cues categorized by: start, end, action, motivation, and pacing
  - Adjustable cue frequency
  - Visual display of cues

- **Music and Sound Effects**
  - Background music with intensity options
  - Sound effects for round start/end and countdowns
  - Separate volume controls

- **User Interface**
  - Clean, dark theme optimized for workouts
  - Responsive design for all device sizes
  - Round indicators showing progress
  - Focus exercise display

- **Settings and Configuration**
  - Audio settings (music, cues, sound effects)
  - Workout preferences
  - User profile with weight for calorie calculations

- **Offline Capabilities**
  - Full functionality without internet connection
  - PWA implementation
  - Local storage for settings

## Technologies Used

- React.js with Vite
- Tailwind CSS for styling
- Howler.js for audio handling
- Context API for state management
- PWA implementation with Workbox

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

1. Clone the repository