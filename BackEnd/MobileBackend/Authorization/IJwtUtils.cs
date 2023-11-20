using MobileBackend.Models;

namespace MobileBackend.Authorization
{
    public interface IJwtUtils
    {
        public string GenerateToken(User user);
        public int? ValidateToken(string token);
    }
}