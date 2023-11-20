using System.Security.Cryptography.X509Certificates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MobileBackend.Dtos.Observation
{
    public class ObservationUpsertDto
    {
        [Required]
        public string Name {get ; set ;}
        [Required]
        public DateTime Time {get; set;}
        public string Comment {get;set;}
        [Required]
        public int HikeId {get;set;}
        
    }
}