import { Server, Socket } from 'socket.io'
import { Message } from '../models/message.model'
import { Chat } from '../models/chat.model';
interface CustomSocket extends Socket {
    userId?: string;
}
class SocketService {
    private _io: Server;
    private onlineAstrologers = new Map<string, string>();
    private onlineUsers = new Map<string, string>();
    constructor() {
        console.log("socket server")
        this._io = new Server({
            pingTimeout: 60000, cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })
    }
    initListeners() {
        console.log("socket initListeners")
        const io = this._io
        io.on("connect", async (socket: CustomSocket) => {
            socket.on("setup", (data) => {
                socket.join(data.user)
                socket.userId = data.user;
                if (data.userType === 'astrologer') {
                    this.onlineAstrologers.set(data.user, socket.id);
                    io.emit("astrologerUpdate", {
                        user: data.user,
                        status: "online"
                    });
                } else {
                    this.onlineUsers.set(data.user, socket.id);
                }
            })

            socket.on('sendRequest', (data, callback) => {
                const astrologerSocket = this.onlineAstrologers.get(data.id);
                if (!astrologerSocket) {
                    return callback({
                        success: false,
                    });
                }
                io.in(data.id).emit('incomingRequest', data, () => {
                    callback({ success: true });
                });
            });
            socket.on('cancelRequest', (data) => {
                io.in(data.id).emit('cancelRequest', data);
            });

            socket.on("cancelRequests", (data) => {
                io.in(data.id).emit("requestRejected", data)
            })
            socket.on("acceptRequest", (data) => {
                io.in(data.id).emit("requestAccepted")
            })
            // socket.on("sendMessage", (data) => {
            //     io.in(data.to).emit("messageReceive", data)
            // })

            socket.on("sendMessage", async (data) => {
               const message =  await Message.create({ content: data.content, sender: data.sender, chat: data.chat, session: data.session, createdAt: data.createdAt })
                await Chat.findByIdAndUpdate({_id:data.chat}, {latestMessage:message._id})
                io.in(data.to).emit("messageReceive", data)
            })

            socket.on("endChat", (data) => {
                io.in(data.to).emit("chatEnded", data);
            });

            socket.on("disconnect", () => {
                if (socket.userId) {
                    if (this.onlineAstrologers.has(socket.userId)) {
                        this.onlineAstrologers.delete(socket.userId);
                        io.emit("astrologerUpdate", {
                            user: socket.userId,
                            status: "offline"
                        });
                    } else {
                        this.onlineUsers.delete(socket.userId);
                    }
                }
            });



        })
    }
    get io() {
        return this._io
    }
    getOnlineAstrologers() {
        return Array.from(this.onlineAstrologers.keys());
    }
}
export default SocketService;
