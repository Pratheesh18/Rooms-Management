# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

To run the project locally
 * clone the project - git clone  <repository>
 * install the dependencies - npm install
 * Run the server - npm run dev

## 📝 Instructions

### Adding a Room
1. Click the **"Add Room"** button located near the tabs.
2. Enter a name for the new room in the dialog that appears.
3. Click **"Add"** to create the room. The new room will be added as a new tab, allowing you to switch between different rooms.

### Saving a Room
1. After making any changes (such as adding or repositioning tables), click the **"Save Room"** button.
2. This will save the current layout of tables and room details to local storage, ensuring your changes persist even after a page refresh.

### Deleting a Room
1. To delete a room, select the room tab you want to remove.
2. Use the **"Delete"** option (if implemented as a button or icon) to remove the room. 
3. Once deleted, the room and its contents will be removed from both the UI and local storage. And you have to save the room to see the updated UI.

---



## 🚀 Technologies Used

- **React**: Frontend library
- **Material-UI**: UI components
- **React DnD**: Drag-and-drop functionality
- **Local Storage**: Data persistence
- **CSS (via Material-UI)**: Styling

## 🎯 Precise Drag-and-Drop Positioning

The precise drag-and-drop positioning of tables is achieved using a combination of **React DnD** and **manual offset calculations**:

1. **React DnD for Drag Events**:
   - The `useDrag` and `useDrop` hooks from React DnD manage drag and drop behaviors for each table and the floor plan. `useDrag` attaches draggable behavior to tables, and `useDrop` defines the floor plan as a droppable area.
   - `isDragging` and `collect` states are used to track the dragging status and manage UI feedback.

2. **Client-Side Offset Calculation**:
   - Upon dropping a table, the component calculates its precise position using the floor plan's bounding rectangle (`getBoundingClientRect`). This calculation considers the exact cursor position relative to the floor plan.
   - The component ensures that tables stay within the floor plan boundaries by adjusting the `x` and `y` coordinates if the table would otherwise fall outside.

### Justification

This approach is chosen for its **simplicity** and **flexibility**. Using React DnD provides a robust way to manage drag-and-drop behavior, while manual calculations allow precise placement and boundary enforcement within the floor plan. This combination ensures tables are positioned accurately and stay within the designated area, enhancing usability and visual consistency.

