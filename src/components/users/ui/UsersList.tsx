import React from 'react';
import { useUsers } from '../state/users.state';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const UsersList: React.FC = () => {
  const { users, loading, error } = useUsers();
  const router = useRouter();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-xl">Users</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.UserID} className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.profileImg} alt={user.name} />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={() => router.push(`/users/${user.UserID}`)}
              >
                View Details
              </Button>
            </div>
          ))}
          
          {users.length === 0 && (
            <div className="text-center p-4">
              <p className="text-gray-500">No users found</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersList; 