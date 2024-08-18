{inputs, ...}: {
  perSystem = {
    config,
    pkgs,
    system,
    inputs',
    self',
    ...
  }: let
    inherit (self'.packages) rust-toolchain;
    inherit (self'.legacyPackages) cargoExtraPackages;

    devTools = [
      pkgs.bacon
      pkgs.cargo-udeps
      rust-toolchain
    ];
  in {
    devShells = {
      default = pkgs.mkShell rec {
        packages = devTools ++ cargoExtraPackages;

        LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath packages;
        RUST_SRC_PATH = "${self'.packages.rust-toolchain}/lib/rustlib/src/rust/src";
      };
    };
  };
}
