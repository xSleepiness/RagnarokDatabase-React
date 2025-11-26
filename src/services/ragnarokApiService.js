import api from './networkModule';

class RagnarokApiService {
  /**
   * Get item details by ID
   */
  async getItem(itemId) {
    const response = await api.get(`items/${itemId}`);
    return response.data;
  }

  /**
   * Get popular items by period
   * @param {string} period - today, yesterday, last7days, last30days
   * @param {number} limit - Number of items to return (default 10)
   */
  async getPopularItems(period = 'today', limit = 10) {
    const response = await api.get(`items/popular/${period}`, {
      params: { limit },
    });
    return response.data;
  }

  /**
   * Search for items
   * @param {string} query - Search query (ID or name)
   * @param {number} limit - Number of results (default 50)
   */
  async searchItems(query, limit = 50) {
    const response = await api.get('items/search', {
      params: { query, limit },
    });
    return response.data;
  }

  /**
   * Get items by type with pagination
   * @param {string} itemType - Type of item
   * @param {number} page - Page number (default 1)
   * @param {number} limit - Items per page (default 20)
   */
  async getItemsByType(itemType, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const response = await api.get('items/filter/by-type', {
      params: { item_type: itemType, skip, limit },
    });
    return response.data;
  }

  /**
   * Get total count of items
   */
  async getItemCount() {
    const response = await api.get('items/count');
    return response.data.total_items;
  }

  /**
   * Get all item types with counts
   */
  async getItemTypes() {
    const response = await api.get('items/types');
    return response.data; // Returns { total_types, types }
  }

  /**
   * Upload item collection image (large image)
   */
  async uploadItemImage(itemId, imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    
    const response = await api.put(`items/${itemId}/images/collection`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /**
   * Get monster details by ID
   */
  async getMonster(monsterId) {
    const response = await api.get(`monsters/${monsterId}`);
    return response.data;
  }
}

export default new RagnarokApiService();
