using System.Collections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBackend.Models;

namespace MobileBackend.Services.IServices
{
    public interface IObservationService
    {
        IList<Observation> GetAll(int hikingId);

        Observation GetById(int id);

        Observation Create(Observation observation);

        Observation Update(Observation observation);

        bool Delete(int id);
    }
}