// Define types
interface User {
  id: number
  name: string
  role: 'admin' | 'user'
  active: boolean
}

// Type-safe user database
const users: User[] = [
  { id: 1, name: 'Alice Johnson', role: 'admin', active: true },
  { id: 2, name: 'Bob Smith', role: 'user', active: true },
  { id: 3, name: 'Carol White', role: 'user', active: false },
]

// Random names for generating users
const firstNames: string[] = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'James', 'Sophia', 'Oliver']
const lastNames: string[] = ['Garcia', 'Martinez', 'Lee', 'Wilson', 'Anderson', 'Thomas', 'Taylor']

// Generic filter function - works with any type that has 'active' property
function filterActive<T extends { active: boolean }>(items: T[]): T[] {
  return items.filter(item => item.active)
}

// Type-safe user creation
function createUser(name: string, role: User['role']): User {
  return {
    id: users.length + 1,
    name,
    role,
    active: Math.random() > 0.3, // 70% chance of being active
  }
}

// DOM Elements
const userListEl = document.getElementById('user-list')!
const activeCountEl = document.getElementById('active-count')!
const totalCountEl = document.getElementById('total-count')!
const adminCountEl = document.getElementById('admin-count')!
const addUserBtn = document.getElementById('add-user')!
const remUserBtn = document.getElementById('remove-user')!

// Render functions with proper typing
function renderUser(user: User): string {
  const statusColor = user.active ? 'bg-emerald-500' : 'bg-slate-600'
  const roleColor = user.role === 'admin' ? 'text-amber-400' : 'text-slate-400'
  
  return `
    <div class="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-semibold text-sm">
          ${user.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p class="font-medium">${user.name}</p>
          <p class="text-xs ${roleColor}">${user.role}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-2 h-2 rounded-full ${statusColor}"></span>
        <span class="text-xs text-slate-500">${user.active ? 'Active' : 'Inactive'}</span>
      </div>
    </div>
  `
}

function updateStats(): void {
  const activeUsers = filterActive(users)
  const admins = users.filter(u => u.role === 'admin')
  
  activeCountEl.textContent = String(activeUsers.length)
  totalCountEl.textContent = String(users.length)
  adminCountEl.textContent = String(admins.length)
}

function renderAllUsers(): void {
  userListEl.innerHTML = users.map(renderUser).join('')
  updateStats()
}

// Event handlers
addUserBtn.addEventListener('click', () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
  const role: User['role'] = Math.random() > 0.8 ? 'admin' : 'user'
  
  const newUser = createUser(`${firstName} ${lastName}`, role)
  users.push(newUser)
  
  renderAllUsers()
  console.log('New user added:', newUser)
})

remUserBtn.addEventListener('click', () => {
  console.log('Removed last user:', users[users.length-1])
  users.pop()
  renderAllUsers()
})
// Initial render
renderAllUsers()
