using AutoMapper;
using MobileBackend.Dtos;
using MobileBackend.Dtos.Hiking;
using MobileBackend.Dtos.Observation;
// using MobileBackend.Dtos.UserDtos;
using MobileBackend.Models;

namespace MobileBackend
{
    public class MappingConfig
    {
        public static MapperConfiguration RegisterMaps()
        {
            var mappingConfig = new MapperConfiguration(config =>
            {
                
                // hikingdto to hikiding
                config.CreateMap<HikeUpsertDto, Hike>().ReverseMap();
                config.CreateMap<ObservationUpsertDto,Observation>().ReverseMap();
                
                // bookupsertrequest to book
                // config.CreateMap<BookUpSertRequest, Book>().ReverseMap();
                
                // // mapping user
                // config.CreateMap<User, AuthenticateResponse>();
                // config.CreateMap<RegisterRequest, User>();
                // config.CreateMap<UpdateRequest, User>()
            //         .ForAllMembers(x => x.Condition(
            //             (src, dest, prop) =>
            //             {
            //                 // ignore null & empty string properties
            //                 if (prop == null) return false;
            //                 if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

            //                 return true;
            //             }
            //         ));
            });
            return mappingConfig;
        }
            
    }
}