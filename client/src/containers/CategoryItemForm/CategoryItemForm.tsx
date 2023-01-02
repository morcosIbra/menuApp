import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Divider, Form, Header, Item, Segment } from 'semantic-ui-react';
import { useCreateCategoryItemMutation } from '../../redux/apis/categories';
import locals from '../../locals/en.json';
import { CategoryItemFormValues } from './CategoryItemForm.types';

const CategoryItemForm = ({ categoryId }: { categoryId: string }) => {
  const [createCategoryItem, { isLoading }] = useCreateCategoryItemMutation();
  const formValidation = {
    name: { required: true },
    description: { required: true },
    price: { min: 0 }
  };
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategoryItemFormValues>({
    defaultValues: {
      name: '',
      description: '',
      price: null
    }
  });
  const submitCategory = (formdata: CategoryItemFormValues) => {
    console.log(errors, formdata);

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
                <Form.Input fluid label="Price" {...field} placeholder="Price" />
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
          <Form.Button>Save</Form.Button>
        </Form>
      </Segment>
    </Item>
  );
};
export default CategoryItemForm;
