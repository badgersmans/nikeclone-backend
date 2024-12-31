import Shoe from '../Models/Shoe.js';


// get trending shoes with pagination
export const getPaginatedShoes = async (req, res) => {
  const PAGE_LIMIT = 5;

    try {
      // Get page number and limit from query parameters
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || PAGE_LIMIT; // Default to PAGE_LIMIT shoes per page
  
      // Calculate the number of shoes to skip for pagination
      const skip = (page - 1) * limit;
  
      // Fetch shoes with pagination
      const shoes = await Shoe.find()
        .sort({ views: -1 }) // Sort by 'views' in descending order
        .skip(skip) // Skip the number of shoes based on page and limit
        .limit(limit); // Limit the results to the specified number of shoes per page
      
      if (!shoes || shoes.length === 0) {
        return res.status(404).json({ message: 'No shoes found' });
      }
  
      // Get the total count of shoes for pagination
      const totalShoes = await Shoe.countDocuments();
  
      // Calculate total pages based on the total number of shoes
      const totalPages = Math.ceil(totalShoes / limit);
  
      return res.status(200).json({
        shoes,
        pagination: {
          currentPage: page,
          totalPages,
          totalShoes,
          limit,
        },
      });
    } catch (error) {
      console.error('Error fetching shoes:', error);
      return res.status(500).json({ message: 'Server Error' });
    }
};