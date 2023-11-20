using System.Collections.Generic;
using MobileBackend.Models;

namespace MobileBackend.Services.IServices
{
    public interface IHikeService
    {
        IList<Hike> GetAll();
        Hike GetById(int id);
        Hike Create(Hike input);
        Hike Update(Hike input);
        bool Delete(int id);
        List<Hike> Search(string keyword);
    }
}