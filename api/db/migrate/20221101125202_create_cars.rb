class CreateCars < ActiveRecord::Migration[7.0]
  def change
    create_table :cars do |t|
      t.string :model
      t.string :year
      t.string :description
      t.string :image
      t.integer :price
      t.boolean :hired
      t.integer :hired_by
      t.integer :created_by

      t.timestamps
    end
  end
end
