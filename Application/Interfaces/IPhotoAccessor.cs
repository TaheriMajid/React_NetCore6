using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photoes;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);

        Task<string> DeletePhoto(string publicId);
    }
}