'use client';

import { UsersProvider } from './state/users.state';
import UsersList from './ui/UsersList';

export default function UsersPage() {
  return (
    <UsersProvider>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Users</h1>
        </div>
        <UsersList />
      </div>
    </UsersProvider>
  );
} 