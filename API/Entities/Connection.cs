using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Connection
    {
        public Connection()
        {
        }

        public Connection(int connectionId, string username)
        {
            ConnectionId = connectionId;
            Username = username;
        }

        public int ConnectionId { get; set; }
        public string Username { get; set; }
    }
}