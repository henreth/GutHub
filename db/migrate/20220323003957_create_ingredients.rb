class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.string :image_url
      t.string :ingredient_type
      

      t.timestamps
    end
  end
end
