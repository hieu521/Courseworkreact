using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MobileBackend.Services.IServices;
using MobileBackend.Models;
using MobileBackend.Dtos.Observation;
using AutoMapper;

namespace MobileBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ObservationController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IObservationService _observationService;

        public ObservationController(IMapper mapper, IObservationService observationService)
        {
            _observationService = observationService;
            _mapper = mapper;
        }

        [HttpGet("get-all/{hikingId:int}")]
        public IList <Observation> GetAll (int hikingId)
        {
            return _observationService.GetAll(hikingId);

        }
    [HttpGet("{id:int}")]
    public IActionResult  GetById([FromRoute]int id){
        var observation =_observationService.GetById(id);

        return Ok(observation);
    }
    [HttpPost]
    public IActionResult Create (ObservationUpsertDto input){
        var observation = _mapper.Map<Observation>(input);
        _observationService.Create(observation);
        return Ok(observation);
    }
    [HttpPut("{id:int}")]
    public IActionResult Update ([FromRoute]int id,ObservationUpsertDto input){

        var observation = _observationService.GetById(id);
        _mapper.Map(input,observation);
        _observationService.Update(observation);
        return Ok(observation);
    }
    [HttpDelete("{id:int}")]
    public IActionResult Delete([FromRoute]int id){
        var result = _observationService.Delete(id);
        if(!result)
            return BadRequest("Could not delete");
        return Ok();

    }
    }

}