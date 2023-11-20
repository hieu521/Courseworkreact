using System;
using System.ComponentModel.DataAnnotations;

namespace MobileBackend.Dtos.Hiking
{
    public class HikeUpsertDto
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Location { get; set; }
        
        [Required]
        public DateTime Date { get; set; }
        
        [Required]
        public bool ParkingAvailable { get; set; }
        
        [Required]
        public int LengthOfHike { get; set; }
        
        [Required]
        public string Level { get; set; }

        public string Description { get; set; }
    }
}