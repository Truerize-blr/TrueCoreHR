// import React, { useState } from "react";

// const initialData = {
//   id: 1,
//   name: "Arjun Kumar",
//   designation: "CEO",
//   photo: "https://i.pravatar.cc/150?img=1",
//   children: [
//     {
//       id: 2,
//       name: "Prem",
//       designation: "Engineering Manager",
//       photo: "https://i.pravatar.cc/150?img=2",
//       children: [
//         {
//           id: 3,
//           name: "You",
//           designation: "Software Engineer",
//           photo: "https://i.pravatar.cc/150?img=3",
//           children: [],
//         },
//       ],
//     },
//   ],
// };

// let idCounter = 100;

// const TreeNode = ({ node, onAdd, onEdit, onDelete }) => {
//   return (
//     <div className="flex flex-col items-center relative">
//       {/* CONNECTION LINE ABOVE (except root) */}
//       <div className="absolute top-[-20px] left-1/2 w-0.5 h-20 bg-blue-400 transform -translate-x-1/2 hidden md:block"></div>
      
//       {/* NODE */}
//       <div className="bg-white rounded-xl shadow-md px-4 py-3 w-52 text-center border border-gray-200 relative z-10">
//         <img
//           src={node.photo}
//           alt={node.name}
//           className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-blue-600"
//         />

//         {/* Name bigger & bolder */}
//         <p className="mt-2 font-semibold text-base text-gray-900">
//           {node.name}
//         </p>

//         {/* Designation slightly bigger & darker */}
//         <p className="text-sm text-gray-600">{node.designation}</p>

//         <div className="flex justify-center gap-3 mt-3">
//           <button
//             onClick={() => onAdd(node.id)}
//             className="text-green-600 hover:text-green-800 text-sm font-medium hover:scale-110 transition-transform"
//             title="Add"
//           >
//             ➕
//           </button>
//           <button
//             onClick={() => onEdit(node.id)}
//             className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:scale-110 transition-transform"
//             title="Edit"
//           >
//             ✏️
//           </button>
//           <button
//             onClick={() => onDelete(node.id)}
//             className="text-red-600 hover:text-red-800 text-sm font-medium hover:scale-110 transition-transform"
//             title="Delete"
//           >
//             🗑️
//           </button>
//         </div>
//       </div>

//       {/* HORIZONTAL CONNECTION LINES TO CHILDREN */}
//       {node.children.length > 0 && (
//         <div className="relative w-full mt-4">
//           {/* Horizontal line */}
//           <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400 transform -translate-y-1/2 hidden md:block"></div>
          
//           {/* Vertical lines from parent to horizontal */}
//           <div className="absolute top-[-8px] left-1/2 w-0.5 h-8 bg-blue-400 transform -translate-x-1/2 hidden md:block"></div>
//         </div>
//       )}

//       {/* CHILDREN */}
//       {node.children.length > 0 && (
//         <div className="flex gap-10 mt-12">
//           {node.children.map((child) => (
//             <TreeNode
//               key={child.id}
//               node={child}
//               onAdd={onAdd}
//               onEdit={onEdit}
//               onDelete={onDelete}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const HierarchyTree = () => {
//   const [tree, setTree] = useState(initialData);

//   const addNode = (id) => {
//     const name = prompt("Enter name");
//     const designation = prompt("Enter designation");

//     if (!name || !designation) return;

//     const newNode = {
//       id: idCounter++,
//       name,
//       designation,
//       photo: `https://i.pravatar.cc/150?img=${idCounter}`,
//       children: [],
//     };

//     const addRecursively = (node) => {
//       if (node.id === id) {
//         node.children.push(newNode);
//       } else {
//         node.children.forEach(addRecursively);
//       }
//     };

//     const updated = structuredClone(tree);
//     addRecursively(updated);
//     setTree(updated);
//   };

//   const editNode = (id) => {
//     const editRecursively = (node) => {
//       if (node.id === id) {
//         node.name = prompt("Edit name", node.name) || node.name;
//         node.designation =
//           prompt("Edit designation", node.designation) || node.designation;
//       } else {
//         node.children.forEach(editRecursively);
//       }
//     };

//     const updated = structuredClone(tree);
//     editRecursively(updated);
//     setTree(updated);
//   };

//   const deleteNode = (id) => {
//     if (tree.id === id) {
//       alert("Cannot delete CEO");
//       return;
//     }

//     const deleteRecursively = (node) => {
//       node.children = node.children.filter((child) => {
//         if (child.id === id) return false;
//         deleteRecursively(child);
//         return true;
//       });
//     };

//     const updated = structuredClone(tree);
//     deleteRecursively(updated);
//     setTree(updated);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10 overflow-auto">
//       <h1 className="text-4xl font-bold mb-12 text-center text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
//         Company Hierarchy
//       </h1>

//       <div className="flex justify-center max-w-6xl mx-auto">
//         <TreeNode
//           node={tree}
//           onAdd={addNode}
//           onEdit={editNode}
//           onDelete={deleteNode}
//         />
//       </div>
//     </div>
//   );
// };

// export default HierarchyTree;

import React, { useState, useCallback } from "react";

const initialData = {
  id: 1,
  name: "Arjun Kumar",
  designation: "CEO",
  photo: "",
  children: [
    {
      id: 2,
      name: "Prem",
      designation: "Engineering Manager",
      photo: "",
      children: [
        {
          id: 3,
          name: "You",
          designation: "Software Engineer",
          photo: "",
          children: [],
        },
      ],
    },
  ],
};

let idCounter = 100;

const TreeNode = ({ node, onAdd, onEdit, onDelete, onUpdatePhoto, level = 0 }) => {
  return (
    <div className="flex flex-col items-center relative">
      {level > 0 && (
        <div className="w-px h-24 bg-gray-300 absolute top-[-28px] left-1/2 transform -translate-x-1/2"></div>
      )}
      
      <div className="bg-white border-2 border-gray-200 rounded-lg shadow-md p-6 w-56 text-center hover:shadow-lg transition-all duration-200 hover:border-gray-300">
        <div className="relative mb-4">
          {!node.photo ? (
            <div 
              className="w-20 h-20 rounded-full mx-auto border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center text-gray-400 text-2xl font-semibold hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all shadow-sm hover:shadow-md"
              onClick={() => onUpdatePhoto(node.id)}
              title="Click to add photo"
            >
            
            </div>
          ) : (
            <img
              src={node.photo}
              alt={node.name}
              className="w-20 h-20 rounded-full mx-auto border-3 border-gray-300 object-cover hover:opacity-90 transition-all cursor-pointer shadow-sm hover:shadow-md hover:scale-105"
              onClick={() => onUpdatePhoto(node.id)}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = `
                  <div class="w-20 h-20 rounded-full mx-auto border-2 border-dashed border-gray-400 bg-gray-100 flex items-center justify-center text-gray-400 text-2xl font-semibold hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all shadow-sm hover:shadow-md" onclick="this.parentNode.dispatchEvent(new CustomEvent('updatePhoto', {detail: ${node.id}}))" title="Click to add photo">
                    👤
                  </div>
                `;
              }}
            />
          )}
        </div>
        
        <h3 className="font-bold text-lg text-gray-800 mb-2">{node.name}</h3>
        <p className="text-sm text-gray-600 font-medium mb-6">{node.designation}</p>
        
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onAdd(node.id)}
            className="w-11 h-11 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg border-2 border-green-200 flex items-center justify-center text-xl font-semibold shadow-sm hover:shadow-md transition-all"
            title="Add Employee"
          >
            ➕
          </button>
          <button
            onClick={() => onEdit(node.id)}
            className="w-11 h-11 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg border-2 border-blue-200 flex items-center justify-center text-xl font-semibold shadow-sm hover:shadow-md transition-all"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(node.id)}
            className="w-11 h-11 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg border-2 border-red-200 flex items-center justify-center text-xl font-semibold shadow-sm hover:shadow-md transition-all"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {node.children.length > 0 && (
        <div className="mt-6 mb-4 relative w-full">
          <div className="h-px bg-gray-300 absolute inset-x-0 top-1/2"></div>
          <div className="w-px h-6 bg-gray-300 absolute left-1/2 top-[-12px] transform -translate-x-1/2"></div>
        </div>
      )}

      {node.children.length > 0 && (
        <div className="flex gap-12 mt-8">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              onUpdatePhoto={onUpdatePhoto}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const HierarchyTree = () => {
  const [tree, setTree] = useState(initialData);

  const addNode = (parentId) => {
    const name = prompt("Enter employee name:");
    const designation = prompt("Enter designation:");
    if (!name || !designation) return;

    const newNode = {
      id: idCounter++,
      name,
      designation,
      photo: "",
      children: [],
    };

    setTree(prevTree => {
      const newTree = structuredClone(prevTree);
      const addRecursively = (node) => {
        if (node.id === parentId) {
          node.children.push(newNode);
        } else {
          node.children.forEach(addRecursively);
        }
      };
      addRecursively(newTree);
      return newTree;
    });
  };

  const editNode = (nodeId) => {
    setTree(prevTree => {
      const newTree = structuredClone(prevTree);
      const editRecursively = (node) => {
        if (node.id === nodeId) {
          node.name = prompt("Edit name:", node.name) || node.name;
          node.designation = prompt("Edit designation:", node.designation) || node.designation;
        } else {
          node.children.forEach(editRecursively);
        }
      };
      editRecursively(newTree);
      return newTree;
    });
  };

  const deleteNode = (nodeId) => {
    if (tree.id === nodeId) {
      alert("Cannot delete CEO");
      return;
    }

    setTree(prevTree => {
      const newTree = structuredClone(prevTree);
      const deleteRecursively = (node) => {
        node.children = node.children.filter((child) => {
          if (child.id === nodeId) return false;
          deleteRecursively(child);
          return true;
        });
      };
      deleteRecursively(newTree);
      return newTree;
    });
  };

  const updatePhoto = useCallback((nodeId) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (e) => {
      const file = e.target.files?.[0];
      if (file && file.type.startsWith('image/') && file.size < 5000000) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setTree(prevTree => {
            const newTree = structuredClone(prevTree);
            const updateRecursively = (node) => {
              if (node.id === nodeId) {
                node.photo = event.target.result;
              } else {
                node.children.forEach(updateRecursively);
              }
            };
            updateRecursively(newTree);
            return newTree;
          });
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select valid image < 5MB');
      }
    };
    
    input.click();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Company Hierarchy</h1>
        </div>
        
        <div className="flex justify-center">
          <TreeNode
            node={tree}
            onAdd={addNode}
            onEdit={editNode}
            onDelete={deleteNode}
            onUpdatePhoto={updatePhoto}
          />
        </div>
      </div>
    </div>
  );
};

export default HierarchyTree;
