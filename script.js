function formatHierarchy(json, parentId = null) {
    let result = [];

    for (let key in json) {
        if (json.hasOwnProperty(key)) {
            let node = {
                id: key,
                parent: parentId,
            };

            if (typeof json[key] === 'object') {
                node.children = formatHierarchy(json[key], key);
            } else {
                node.value = json[key];
            }

            result.push(node);
        }
    }

    return result;
}

function displayHierarchy(data, depth = 0) {
    const container = document.getElementById('display-value')
    data.forEach(item => {
        const folderContainer = document.createElement('div');
        folderContainer.className = 'folder';
    
        // Create and display the current item with proper indentation
        const indentation = ' '.repeat(depth * 4);
        const itemName = document.createTextNode(`${indentation}${item.id} --- ${item.value || ''}`);
        folderContainer.appendChild(itemName);
    
        // If the current item has children, recursively display them
        if (item.children && item.children.length > 0) {
          displayHierarchy(item.children, folderContainer, depth + 1);
        }
    
        // Prepend the current folder to the specified container
        container.insertBefore(folderContainer, container.firstChild);
      });
}

function resquest() {
    const getInputById = document.getElementById('jsonTextarea')
    let formattedData = []
    formattedData = formatHierarchy(JSON.parse(getInputById.value));
    displayHierarchy(formattedData)
}



