namespace Entities
{
    public class City
    { 
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
    }

    public class CityViewModel: City
    {
        public int Total { get; set; }
    }
}
