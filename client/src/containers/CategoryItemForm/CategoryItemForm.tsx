import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Divider, Form, Header, Item, Message, Segment } from 'semantic-ui-react';
import { useCreateCategoryItemMutation } from '../../redux/apis/categories';
import locals from '../../locals/en.json';
import { CategoryItemFormValues } from './CategoryItemForm.types';

const CategoryItemForm = ({ categoryId }: { categoryId: string }) => {
  const [createCategoryItem, { isLoading }] = useCreateCategoryItemMutation();
  const formValidation = {
    name: { required: true },
    description: { required: true },
    price: { required: true, min: 0 }
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid }
  } = useForm<CategoryItemFormValues>({
    defaultValues: {
      name: '',
      description: '',
      price: ''
    }
  });
  const submitCategory = (formdata: CategoryItemFormValues) => {
    createCategoryItem({ categoryId: categoryId, categoryItemData: formdata });
  };
  useEffect(() => {
    if (!isLoading) reset();
  }, [isLoading, reset]);

  return (
    <Item>
      <Header>{locals.editCategoryItem}</Header>
      <Segment>
        <Form onSubmit={handleSubmit(submitCategory)}>
          <Form.Group widths="equal">
            <Controller
              name="name"
              rules={formValidation.name}
              control={control}
              render={({ field }) => (
                <Form.Input
                  fluid
                  {...formValidation.name}
                  label="Name"
                  {...field}
                  placeholder="Name"
                />
              )}
            />
            <Controller
              name="price"
              rules={formValidation.price}
              control={control}
              render={({ field }) => (
                <Form.Input
                  fluid
                  label="Price"
                  {...field}
                  type="number"
                  {...formValidation.price}
                  placeholder="Price"
                />
              )}
            />
          </Form.Group>

          <Controller
            name="description"
            control={control}
            rules={formValidation.name}
            render={({ field }) => (
              <Form.TextArea
                fluid
                label="Description"
                {...formValidation.name}
                {...field}
                placeholder="Name"
              />
            )}
          />
          <Divider />
          <Form.Button color="teal" disabled={!isValid}>
            Save
          </Form.Button>
        </Form>
      </Segment>
    </Item>
  );
};
export default CategoryItemForm;
