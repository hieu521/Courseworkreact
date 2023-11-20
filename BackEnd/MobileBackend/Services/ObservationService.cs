using System.ComponentModel;
using System.Security.Cryptography.X509Certificates;
using System.Net.Mime;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MobileBackend.Services.IServices;
using MobileBackend.Models;
using MobileBackend.DbContext;

namespace MobileBackend.Services
{
    public class ObservationService :  IObservationService
    {
        private readonly ApplicationDbContext _db;

        public ObservationService(ApplicationDbContext db)
        {
            _db = db;
        }
        public IList<Observation> GetAll(int hikingId)
        {
            return _db.Observations.Where(_=>_.HikeId == hikingId).ToList();
        }

        public Observation GetById(int id)
        {
            try
            {
                var observation = _db.Observations
                    .FirstOrDefault(x => x.Id == id);
                if (observation == null)
                    throw new NullReferenceException();
                return observation;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public Observation Create(Observation observationInput)
        {
            try
            {
                _db.Observations.Add(observationInput);
                _db.SaveChanges();
                return observationInput;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public Observation Update(Observation observationInput)
        {
            try
            {
                _db.Observations.Update(observationInput);
                _db.SaveChanges();
                return observationInput;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }

        public bool Delete(int id)
        {
            try
            {
                var observation = GetById(id);
                if (observation == null)
                    return false;
                
                _db.Observations.Remove(observation);
                _db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
        }
    }

}