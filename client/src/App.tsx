import { useState, useEffect } from "react";
import "./App.css";
import Pusher from 'pusher-js'

const App:React.FC = ()=> {
  const [username, setUserName] = useState("username");
  const [message, setMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<Record<string, any>>([]);
  const allMessages: IMessage[] = [];
  
  
  interface  IMessage {
    username: string;
    message: string
  }
  useEffect(()=>{
    Pusher.logToConsole = true;

    const pusher = new Pusher('5cd128ae898c66f6028b', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', function(data:IMessage) {
     allMessages.push(data);
     setMessages(allMessages)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault();
  
   await fetch('http://localhost:4000/api/messages', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      username,
      message
    })
   })
   setMessage('')
  }

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-body-tertiary">
        <div className="d-flex align-items-center flex-shrink-0 p-3 link-body-emphasis text-decoration-none border-bottom">
          <input className="fs-5 fw-semibold" value={username} onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <div className="list-group list-group-flush border-bottom scrollarea">
          {
            messages.map((message:IMessage)=> (
              <div className="list-group-item list-group-item-action py-3 lh-sm">
              <div className="d-flex w-100 align-items-center justify-content-between">
                <strong className="mb-1">{message.username}</strong>
              </div>
              <div className="col-10 mb-1 small">
                {message.message}
              </div>
            </div>
            ))
          }
        
        </div>
      </div>
      <form onSubmit={e=> handleSubmit(e)}>
        <input className="form-control" placeholder="Write your message" value={message} onChange={(e)=> setMessage(e.target.value)}/>
      </form>
    </div>
  );
}

export default App;
