# PLAYDOGS Studio - Metadata IPFS CID Updater
# Run this script after uploading your images folder to Pinata

import os
import json

def main():
    print("----------------------------------------------------")
    print("PLAYDOGS IPFS Metadata Updater")
    print("----------------------------------------------------")
    
    cid = input("Enter your Pinata/IPFS Images Folder CID (starts with Qm...): ").strip()
    if not cid:
        print("Error: CID cannot be empty.")
        return

    meta_dir = os.path.join("build", "metadata")
    if not os.path.exists(meta_dir):
        print(f"Error: Metadata directory '{meta_dir}' not found.")
        return

    json_files = [f for f in os.listdir(meta_dir) if f.endswith(".json")]
    print(f"Updating {len(json_files)} metadata files...")

    success_count = 0
    for file_name in json_files:
        file_path = os.path.join(meta_dir, file_name)
        try:
            with open(file_path, "r") as f:
                data = json.load(f)

            # Update image path
            if "image" in data:
                data["image"] = data["image"].replace("YOUR_IPFS_CID", cid)

            with open(file_path, "w") as f:
                json.dump(data, f, indent=2)
            
            success_count += 1
        except Exception as e:
            print(f"Error updating file {file_name}: {e}")

    # Also update master metadata list
    master_path = os.path.join("build", "_metadata.json")
    if os.path.exists(master_path):
        try:
            with open(master_path, "r") as f:
                master_data = json.load(f)
            
            for item in master_data:
                if "image" in item:
                    item["image"] = item["image"].replace("YOUR_IPFS_CID", cid)

            with open(master_path, "w") as f:
                json.dump(master_data, f, indent=2)
            print("Updated build/_metadata.json master list.")
        except Exception as e:
            print(f"Error updating master metadata list: {e}")

    print(f"\nSuccessfully updated {success_count} JSON metadata files with CID: {cid}!")
    print("You are now ready to upload the 'build/metadata/' folder to Pinata.")

if __name__ == "__main__":
    main()
