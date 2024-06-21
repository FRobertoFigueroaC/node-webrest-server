import { CategoryModel } from '../../data/mongo';
import { CategoryEntity, CustomError, PaginationDto, UserEntity } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';


export class CategoryService {
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity){

    const categoryExists = await CategoryModel.findOne( { name: createCategoryDto.name});
    if (categoryExists) throw CustomError.badRequest('Category already exists');

    try {

      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available
      }
      
    } catch (error) {
      throw CustomError.internalServer('Error when trying to create a category');
    }

  }

  async getCategories( paginationDto :PaginationDto){
    const {page, limit} = paginationDto;
    try {
      const [ total , categories] = await Promise.all([
        await CategoryModel.countDocuments(),
        await CategoryModel.find()
          .skip( ( page - 1 ) * limit )
          .limit( limit )
      ]);

      if(!categories) throw CustomError.badRequest('Categories not found');

      return {
        items: categories.map( category => { return CategoryEntity.fromObject(category)}), 
        total
      };
    } catch (error) {
      throw CustomError.internalServer( 'Error when trying to get catagories' );
    }
  }

}