# MS-Node
Node MicroService - ListManagerApi
1. POST /list/video - add new video to list
2. GET /list - return the video list - Optional limit and index to support pagination.
3. DELETE /list/video/:id - remove from the first video if it is with the id.

SOCKET.IO
Update all connected clients with new videos that were added.