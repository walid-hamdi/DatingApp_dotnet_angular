using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        public Task<ImageUploadResult> AddPhoto(IFormFile file);
        public Task<DeletionResult> DeletePhoto(string publicId);
    }
}