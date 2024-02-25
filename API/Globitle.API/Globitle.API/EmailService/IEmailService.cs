using AutoMapper.Internal;
using Globitle.API.Models.Email;

namespace Globitle.API.EmailService
{
    public interface IEmailService
    {
        Task SendEmailAsync(Mailrequest mailrequest);
    }
}
