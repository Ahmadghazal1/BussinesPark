using Globitle.API.Models;

namespace Globitle.API.IRepositories
{
    public interface IAuthRepository
    {
        Task<AuthModel> RegisterAsync(RegisterModel model);
       Task<AuthModel> GetTokenAsync(TokenRequestModel model);
       Task<string> AddRoleAsync(AddRoleModel model);
    }
}
