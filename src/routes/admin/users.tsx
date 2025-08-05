import { FC } from "hono/jsx";
import { Context } from "hono";
import { AdminLayout } from "../../components/AdminLayout";
import { createDb } from "../../db";
import { user } from "../../lib/auth/schema";
import { desc } from "drizzle-orm";

export const AdminUsers: FC<{ users: any[] }> = ({ users }) => {
  return (
    <div class="admin-content">
      <div class="admin-header">
        <h1>Users</h1>
        <button class="btn btn-primary" onclick="showCreateUserModal()">
          Add User
        </button>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name || '-'}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    class="btn btn-sm btn-danger"
                    onclick={`deleteUser('${user.id}')`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id="createUserModal" class="modal" style="display: none;">
        <div class="modal-content">
          <h2>Create New User</h2>
          <form id="createUserForm">
            <div class="form-group">
              <label>Name</label>
              <input type="text" name="name" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" name="email" required />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" name="password" required minlength="8" />
            </div>
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Create User</button>
              <button type="button" class="btn btn-secondary" onclick="hideCreateUserModal()">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          function showCreateUserModal() {
            document.getElementById('createUserModal').style.display = 'flex';
          }

          function hideCreateUserModal() {
            document.getElementById('createUserModal').style.display = 'none';
            document.getElementById('createUserForm').reset();
          }

          document.getElementById('createUserForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            
            try {
              const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  name: formData.get('name'),
                  email: formData.get('email'),
                  password: formData.get('password')
                }),
                credentials: 'same-origin'
              });
              
              if (response.ok) {
                alert('User created successfully');
                window.location.reload();
              } else {
                const error = await response.text();
                alert('Error creating user: ' + error);
              }
            } catch (error) {
              alert('Error creating user: ' + error.message);
            }
          });

          async function deleteUser(userId) {
            if (!confirm('Are you sure you want to delete this user?')) return;
            
            try {
              const response = await fetch('/api/users/' + userId, {
                method: 'DELETE',
                credentials: 'same-origin'
              });
              
              if (response.ok) {
                window.location.reload();
              } else {
                alert('Error deleting user');
              }
            } catch (error) {
              alert('Error deleting user: ' + error.message);
            }
          }
        `
      }} />
    </div>
  );
};

export const adminUsersHandler = async (c: Context<{ Bindings: { DB: D1Database } }>) => {
  const db = createDb(c.env.DB);
  const users = await db.select().from(user).orderBy(desc(user.createdAt)).all();
  
  const currentUser = c.get('user');
  
  return c.html(
    <AdminLayout currentPath="/admin/users" userName={currentUser?.name}>
      <AdminUsers users={users} />
    </AdminLayout>
  );
};