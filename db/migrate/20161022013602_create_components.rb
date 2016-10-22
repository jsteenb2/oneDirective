class CreateComponents < ActiveRecord::Migration[5.0]
  def change
    create_table :components do |t|
      t.text :name
      t.text :content
      t.integer :order
      t.references :row, foreign_key: true

      t.timestamps
    end
  end
end
