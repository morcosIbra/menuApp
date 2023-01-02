import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Accordion, AccordionPanelProps, Header, SemanticShorthandItem } from 'semantic-ui-react';
import MenuItemTitle from '../../components/MenuItemAccordion/MenuItemTitle';
import {
  useDeleteCategoryItemMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery
} from '../../redux/apis/categories';
import { RootState } from '../../redux/store';

import EditCategoryFormModal from '../EditCategoryFormModal/EditCategoryFormModal';
import EditCategoryItemFormModal from '../EditCategoryItemFormModal/EditCategoryItemFormModal';
import locals from '../../locals/en.json';
import CategoryContent from '../../components/MenuItemAccordion/CategoryContent';
import CategoryItemContent from '../../components/MenuItemAccordion/CategoryItemContent';
import { Category, CategoryItem } from '../../models/Categories';

const CategoryList = () => {
  const {
    user: { role }
  } = useSelector((state: RootState) => state.auth);
  const isAdmin = role === 'admin';

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [deleteCategoryItem] = useDeleteCategoryItemMutation();

  const [updateCategory, setUpdateCategory] = useState<Category | null>(null);
  const [updateCategoryItem, setUpdateCategoryItem] = useState<CategoryItem | null>(null);
  const [updateType, setUpdateType] = useState<
    'removeCategory' | 'editCategory' | 'removeCategoryItem' | 'editCategoryItem' | 'idle'
  >('idle');

  const editCategory = (id: string) => {
    setUpdateType('editCategory');
    const selectedcategory = categories?.find(({ id: _id }) => _id === id) || null;
    setUpdateCategory(selectedcategory);
  };

  const editCategoryItem = (id: string, categoryId: string) => {
    const selectedCategory = categories?.find(({ id }) => id === categoryId);
    if (selectedCategory) {
      const categoryItem = selectedCategory.items?.find(({ id: _id }) => _id === id);
      if (categoryItem) {
        setUpdateCategoryItem(categoryItem);
        setUpdateType('editCategoryItem');
      }
    }
  };

  const closeForm = () => {
    setUpdateCategory(null);
    setUpdateCategoryItem(null);
    setUpdateType('idle');
  };

  const categoryItemsPanels = (
    categoryId: string,
    items: CategoryItem[]
  ): SemanticShorthandItem<AccordionPanelProps>[] => {
    return items.map((item: CategoryItem) => ({
      key: item.id,
      title: {
        content: (
          <MenuItemTitle
            title={item.name}
            showActions={isAdmin}
            editItem={() => editCategoryItem(item.id, categoryId)}
            removeItem={() => deleteCategoryItem(item.id)}
          />
        )
      },
      content: {
        content: <CategoryItemContent description={item.description} price={item.price} />
      }
    }));
  };

  const categoryPanels = categories?.map((category) => ({
    key: category.id,
    title: {
      content: (
        <MenuItemTitle
          title={category.name}
          showActions={isAdmin}
          editItem={() => editCategory(category.id)}
          removeItem={() => deleteCategory(category.id)}
        />
      )
    },
    content: {
      content: (
        <CategoryContent
          id={category.id}
          description={category.description}
          showCategoryItemForm={isAdmin}>
          {category.items?.length > 0 && (
            <Accordion.Accordion
              defaultActiveIndex={0}
              styled
              fluid
              panels={categoryItemsPanels(category.id, category.items)}
            />
          )}
        </CategoryContent>
      )
    }
  }));

  return (
    <div>
      <Header color="teal">{locals.menuData}</Header>
      {isError && (
        <p>
          Something went wrong, please make sure that server is up and running according to readme
          file
        </p>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Accordion defaultActiveIndex={0} panels={categoryPanels} styled fluid />
      )}

      {updateType === 'editCategory' && updateCategory !== null && (
        <EditCategoryFormModal
          categoryData={updateCategory}
          closeHandle={closeForm}
          isOpen={updateType === 'editCategory'}
        />
      )}

      {updateType === 'editCategoryItem' && updateCategoryItem !== null && (
        <EditCategoryItemFormModal
          categoryItem={updateCategoryItem}
          closeHandle={closeForm}
          isOpen={updateType === 'editCategoryItem'}
        />
      )}
    </div>
  );
};
export default CategoryList;
