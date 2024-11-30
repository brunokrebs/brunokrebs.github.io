import {v1} from '@authzed/authzed-node';

const client = new v1.NewClient(
  'some-random-key-here',
  'localhost:50051',
  v1.ClientSecurity.INSECURE_LOCALHOST_ALLOWED,
);

try {
  const response = await new Promise((resolve, reject) => {
    client.checkPermission(
      {
        resource: {
          objectType: 'task',
          objectId: 'task-001',
        },
        permission: 'view',
        subject: {
          object: {
            objectType: 'user',
            objectId: 'user-001',
          },
        },
      },
      (error, response) => {
        if (error) reject(error);
        else resolve(response);
      },
    );
  });

  switch (response.permissionship) {
    case v1.CheckPermissionResponse_Permissionship.NO_PERMISSION: {
      console.log('No permission... go away');
      break;
    }

    case v1.CheckPermissionResponse_Permissionship.HAS_PERMISSION: {
      console.log('You do have permission. Go ahead!');
      break;
    }

    case v1.CheckPermissionResponse_Permissionship.UNSPECIFIED: {
      console.log('Unknown permissionship!? What are you doing here?');
      break;
    }

    default: {
      console.error('Unknown permissionship:', response.permissionship);
      break;
    }
  }
} catch (error) {
  console.error('Oh, damn, error checking permission:', error);
}
