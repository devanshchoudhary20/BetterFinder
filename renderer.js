const selectFolderBtn = document.getElementById('select-folder')
const backBtn = document.getElementById('back-button')
const fileTree = document.getElementById('file-tree')

let currentPath = ''
let pathHistory = []

selectFolderBtn.addEventListener('click', async () => {
    const folderPath = await window.electronAPI.openFolderDialog()
    if (folderPath) {
        currentPath = folderPath
        pathHistory = [folderPath]
        displayFileTree(folderPath)
    }
})

backBtn.addEventListener('click', () => {
    if (pathHistory.length > 1) {
        pathHistory.pop() // Remove current path
        currentPath = pathHistory[pathHistory.length - 1] // Get previous path
        displayFileTree(currentPath)
    }
})

async function displayFileTree(dirPath) {
    try {
        const items = await window.electronAPI.readDirectory(dirPath)
        fileTree.innerHTML = '' // Clear previous content
        const ul = document.createElement('ul')

        for (const item of items) {
            const li = document.createElement('li')
            li.textContent = item.name

            if (item.isDirectory) {
                li.classList.add('folder')
                li.addEventListener('click', async (event) => {
                    event.stopPropagation()
                    currentPath = item.path
                    pathHistory.push(currentPath)
                    displayFileTree(currentPath)
                })
            } else {
                li.classList.add('file')
            }

            ul.appendChild(li)
        }

        fileTree.appendChild(ul)
        updateBackButton()
    } catch (error) {
        console.error('Error displaying file tree:', error)
    }
}

function updateBackButton() {
    backBtn.style.display = pathHistory.length > 1 ? 'inline-block' : 'none'
}

fileTree.addEventListener('click', (event) => {
    if (event.target.classList.contains('folder')) {
        event.target.classList.toggle('open')
    }
})
