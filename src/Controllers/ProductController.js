import Product from '../Models/Product.js';


// get trending products with pagination (sorted by most views)
export const trendingProducts = async (req, res) => {
    try {
      // Get page number and limit from query parameters
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default to 10 products per page
  
      // Calculate the number of products to skip for pagination
      const skip = (page - 1) * limit;
  
      // Fetch products with pagination
      const products = await Product.find()
        .sort({ views: -1 }) // Sort by 'views' in descending order
        .skip(skip) // Skip the number of products based on page and limit
        .limit(limit); // Limit the results to the specified number of products per page
      
      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'No trending products found' });
      }
  
      // Get the total count of products for pagination
      const totalProducts = await Product.countDocuments();
  
      // Calculate total pages based on the total number of products
      const totalPages = Math.ceil(totalProducts / limit);
  
      return res.status(200).json({
        trendingProducts: products,
        pagination: {
          currentPage: page,
          totalPages,
          totalProducts,
          limit,
        },
      });
    } catch (error) {
      console.error('Error fetching trending products:', error);
      return res.status(500).json({ message: 'Server Error' });
    }
  };