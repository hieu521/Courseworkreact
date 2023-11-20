using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MobileBackend.Models
{
    public class Observation
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
        
        [Required]
        public DateTime Time { get; set; }

        public string Comment { get; set; }

        [Required]
        public int HikeId { get; set; }
        [ForeignKey("HikeId")]
        public Hike Hike { get; set; }
    }
}