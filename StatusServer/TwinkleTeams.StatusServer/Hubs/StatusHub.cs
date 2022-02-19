using Microsoft.AspNetCore.SignalR;

namespace TwinkleTeams.StatusServer.Hubs
{
    public class StatusHub : Hub
    {
        public async Task SendMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
